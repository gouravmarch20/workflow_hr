import React, { useState } from "react";
import { Play, X, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { SimulationResult, ValidationError } from "@/types/workflow";
import { Card } from "./common/Card";

interface SimulatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulate: () => Promise<{
    result?: SimulationResult;
    errors?: ValidationError[];
  }>;
}

export const SimulatorPanel: React.FC<SimulatorPanelProps> = ({
  isOpen,
  onClose,
  onSimulate,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSimulate = async () => {
    setIsRunning(true);
    setResult(null);
    setErrors([]);

    try {
      const response = await onSimulate();
      if (response.errors && response.errors.length > 0) {
        setErrors(response.errors);
      } else if (response.result) {
        setResult(response.result);
      }
    } catch (error) {
      setErrors([{ message: "Simulation failed", type: "error" }]);
    } finally {
      setIsRunning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Play size={20} />
            <h2 className="text-lg font-bold">Workflow Simulator</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!result && errors.length === 0 && !isRunning && (
            <div className="text-center py-8">
              <Play size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Run a simulation to test your workflow
              </p>
              <button
                onClick={handleSimulate}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Start Simulation
              </button>
            </div>
          )}

          {isRunning && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Running simulation...</p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-red-600 flex items-center gap-2">
                <AlertCircle size={20} />
                Validation Errors
              </h3>
              {errors.map((error, index) => (
                <Card key={index} className="p-4 border-red-200 bg-red-50">
                  <p className="text-sm text-red-800">{error.message}</p>
                </Card>
              ))}
              <button
                onClick={handleSimulate}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium mt-4"
              >
                Retry Simulation
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <Card
                className={`p-4 ${
                  result.success
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                  <span
                    className={`font-semibold ${
                      result.success ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {result.success
                      ? "Simulation Successful"
                      : "Simulation Failed"}
                  </span>
                </div>
                {result.duration && (
                  <p className="text-xs text-gray-600 mt-2">
                    Duration: {result.duration}ms
                  </p>
                )}
              </Card>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Execution Steps
                </h3>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {step.status === "completed" && (
                            <CheckCircle size={16} className="text-green-500" />
                          )}
                          {step.status === "failed" && (
                            <AlertCircle size={16} className="text-red-500" />
                          )}
                          {step.status === "pending" && (
                            <Clock size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-800">
                              {step.nodeLabel}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {step.nodeType}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {step.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(step.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSimulate}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Run Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
