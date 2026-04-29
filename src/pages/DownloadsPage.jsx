import React from "react";
import { Button, Card } from "@heroui/react";

export default function DownloadsPage() {
  const handleDownload = (filename) => {
    // Crea un elemento invisible para descargar el archivo
    const link = document.createElement("a");
    link.href = `/downloads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tools = [
    {
      name: "ComfyUI",
      description: "Interfaz visual basada en nodos para generación de imágenes con IA.",
      installerFile: "install_comfyui.bat",
      runFile: "run_comfyui.bat",
      steps: [
        "Instala Python 3.10",
        "Descarga el instalador",
        "Haz doble clic en el .bat",
      ],
    },
    {
      name: "SwarmUI",
      description: "Sistema avanzado para workflows de IA y generación multiusuario.",
      installerFile: "install_swarmui.bat",
      runFile: "run_swarmui.bat",
      steps: [
        "Instala Python 3.10",
        "Descarga el instalador",
        "Ejecuta el .bat",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Setup rápido IA</h1>
          <p className="text-gray-400 text-lg">
            Instala y ejecuta tus herramientas de generación en minutos.
          </p>
        </div>

        {/* TOOLS CARDS */}
        <div className="space-y-8 mb-12">
          {tools.map((tool, idx) => (
            <Card key={idx} className="bg-zinc-900 border border-zinc-800">
              <Card.Content className="gap-4">
                <h2 className="text-2xl font-semibold">{tool.name}</h2>
                <p className="text-gray-400">{tool.description}</p>

                {/* BUTTONS */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    color="primary"
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => handleDownload(tool.installerFile)}
                  >
                    Descargar instalador
                  </Button>

                  <Button
                    variant="bordered"
                    className="border-gray-600 text-white hover:bg-zinc-800"
                    onClick={() => handleDownload(tool.runFile)}
                  >
                    Script de ejecución
                  </Button>
                </div>

                {/* STEPS */}
                <div className="bg-zinc-800 p-4 rounded-lg text-sm mt-2">
                  <p className="mb-3 font-semibold text-white">Pasos:</p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-1">
                    {tool.steps.map((step, stepIdx) => (
                      <li key={stepIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* REQUIREMENTS */}
        <Card className="bg-zinc-900 border border-zinc-800">
          <Card.Content>
            <h2 className="text-xl font-semibold mb-4">Requisitos del Sistema</h2>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Windows 10/11
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Python 3.10 o superior
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> GPU NVIDIA recomendada
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Drivers NVIDIA actualizados
              </li>
            </ul>
          </Card.Content>
        </Card>

        {/* FOOTER NOTE */}
        <div className="text-center text-gray-500 mt-12 text-sm border-t border-zinc-800 pt-8">
          <p>💡 Si algo falla, revisa los drivers o ejecuta en modo CPU.</p>
        </div>
      </div>
    </div>
  );
}



