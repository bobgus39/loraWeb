import React from "react";
import { Button, Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const navigate = useNavigate();
 const handleOrder = (service, extras = {}) => {
  navigate("/order", {
    state: { service, extras },
  });
};

  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
          Modelos LoRA personalizados con calidad profesional
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Entrena modelos únicos para tu estilo, marca o contenido.
          Desde datasets simples hasta pipelines completos listos para producción.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <Button
  onClick={() => navigate("/order")}
  className="bg-blue-600 text-white hover:bg-blue-500"
>
  Encargar LoRA
</Button>

          <Button variant="bordered" className="text-lg px-6 py-3 hover:bg-white/10" onClick={() => navigate("/downloads")}>
            Descarga las herramientas
          </Button>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Calidad profesional",
            desc: "Resultados comparables a los mejores modelos actuales.",
          },
          {
            title: "Entrenamiento optimizado",
            desc: "Configuraciones ajustadas para máxima fidelidad y eficiencia.",
          },
          {
            title: "Entrega lista para usar",
            desc: "Modelos + ejemplos + instrucciones claras.",
          },
        ].map((item, i) => (
          <Card key={i} className="bg-zinc-900 border border-zinc-800">
            <Card.Content>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </Card.Content>
          </Card>
        ))}
      </section>

      {/* SERVICIOS */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Servicios
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <Card className="bg-zinc-900 border border-zinc-800">
              <Card.Content>
                <h3 className="text-xl font-semibold mb-2">
                  LoRA completo
                </h3>
                <p className="text-gray-400 mb-4">
                  Desde cero: preparación de dataset, entrenamiento y optimización.
                </p>
                <Button
  onClick={() => handleOrder( "full" )}  
  className="bg-blue-600 text-white w-full hover:bg-blue-500"
>
  Contratar
</Button>
              </Card.Content>
            </Card>

            <Card className="bg-zinc-900 border border-zinc-800">
              <Card.Content>
                <h3 className="text-xl font-semibold mb-2">
                  Entrenamiento rápido
                </h3>
                <p className="text-gray-400 mb-4">
                  Ya tienes imágenes listas. Entreno tu modelo optimizado.
                </p>
                <Button
  onClick={() => handleOrder( "fast" )}
  className="bg-blue-600 text-white w-full hover:bg-blue-500"
>
  Contratar
</Button>
              </Card.Content>
            </Card>

            <Card className="bg-zinc-900 border border-zinc-800">
              <Card.Content>
                <h3 className="text-xl font-semibold mb-2">
                  Workflows + automatización
                </h3>
                <p className="text-gray-400 mb-4">
                  Pipelines en ComfyUI y sistemas listos para producción.
                </p>
                <Button
  onClick={() =>
  handleOrder(
     "full",
     { workflow: true, api: true },
  )
}
  className="bg-blue-600 text-white w-full hover:bg-blue-500"
>
  Contratar
</Button>
              </Card.Content>
            </Card>

          </div>
        </div>
      </section>

      {/* EXTRAS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Extras disponibles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            "Generación de imágenes",
            "Generación de vídeo",
            "APIs locales personalizadas",
            "Optimización de modelos",
            "Setup en tu PC",
            "Soporte y mantenimiento",
          ].map((extra, i) => (
            <Card key={i} className="bg-zinc-900 border border-zinc-800">
              <Card.Content>
                <p className="text-gray-300">{extra}</p>
              </Card.Content>
            </Card>
          ))}

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 text-center bg-gradient-to-b from-black to-zinc-900 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Empieza a crear con tus propios modelos
        </h2>

        <p className="text-gray-400 mb-8">
          Cuéntame tu caso y te propongo la mejor solución.
        </p>

        <Button
  onClick={() => navigate("/order")}
  className="bg-blue-600 text-white hover:bg-blue-500"
>
  Solicitar presupuesto
</Button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        © 2026 - Servicios IA personalizados
      </footer>

    </div>
  );
}