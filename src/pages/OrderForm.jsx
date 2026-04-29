import React, { useState } from "react";
import { Button, Card, Input, TextArea, Checkbox } from "@heroui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function OrderForm() {
  const [files, setFiles] = useState([]);
  const [service, setService] = useState("full");
  const [extras, setExtras] = useState({
    images: false,
    video: false,
    workflow: false,
    api: false,
  });
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [description, setDescription] = useState("");
const location = useLocation();

useEffect(() => {
  if (location.state?.service) {
    setService(location.state.service);
  }

  if (location.state?.extras) {
    setExtras((prev) => ({
      ...prev,
      ...location.state.extras,
    }));
  }
}, []);

  const handleSubmit = async () => {
  const formData = new FormData();
const orderId = crypto.randomUUID();
  formData.append("orderId", orderId);

  formData.append("name", name);
  formData.append("email", email);
  formData.append("service", service);
  formData.append("extras", JSON.stringify(extras));
  formData.append("description", description);
  formData.append("price", calculateTotal());

  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data.error);
if (!data.error) {
    alert("Pedido enviado correctamente 🚀");
} else {
    alert(data.error);
}
  } catch (err) {
    console.error(err);
    alert( "Error al enviar el pedido");
  }
};

  const basePrices = {
    full: 120,
    fast: 60,
  };

  const extrasPrices = {
    images: 30,
    video: 50,
    workflow: 40,
    api: 80,
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleExtraChange = (key) => {
    setExtras({ ...extras, [key]: !extras[key] });
  };

  const calculateTotal = () => {
    let total = basePrices[service];

    Object.keys(extras).forEach((key) => {
      if (extras[key]) total += extrasPrices[key];
    });

    return total;
  };

  const removeFile = (index) => {
  setFiles((prevFiles) =>
    prevFiles.filter((_, i) => i !== index)
  );
};

useEffect(() => {
  return () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  };
}, [files]);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Solicitar LoRA personalizado
        </h1>

        <Card className="bg-zinc-900 border border-zinc-800">
          <Card.Content className="space-y-6">

            {/* DATOS */}
            <Input label="Nombre"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />

            {/* SERVICIO */}
            <div>
              <p className="mb-2 font-semibold">Tipo de servicio</p>

              <div className="flex gap-4">
                <Button
                  variant={service === "full" ? "solid" : "bordered"}
                  onClick={() => setService("full")}
                   className={
    service === "full"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "text-white hover:bg-white/10"
  }
                >
                  LoRA completo
                </Button>

                <Button
                  variant={service === "fast" ? "solid" : "bordered"}
                  onClick={() => setService("fast")}
                   className={
    service === "fast"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : "text-white hover:bg-white/10"
  }
                >
                  Entrenamiento rápido
                </Button>
              </div>
            </div>

            {/* DATASET */}
           <div>
  <p className="mb-2 font-semibold">Sube tus imágenes</p>

  <label
    className="flex flex-col items-center justify-center w-full h-40
    border-2 border-dashed border-zinc-600 rounded-xl cursor-pointer
    bg-zinc-900 hover:bg-zinc-800 transition-all"
  >
    <input
      type="file"
      multiple
      onChange={handleFileChange}
      className="hidden"
    />

    <p className="text-gray-400">
      Arrastra imágenes aquí o haz clic
    </p>

    <p className="text-xs text-gray-500 mt-1">
      PNG, JPG, WEBP
    </p>
  </label>

  {/* CONTADOR */}
  {files.length > 0 && (
    <p className="text-sm text-gray-400 mt-2">
      {files.length} imágenes seleccionadas
    </p>
  )}

  {/* PREVIEW */}
 <div className="grid grid-cols-4 gap-2 mt-4">
  {files.map((file, i) => (
    <div key={i} className="relative">
      <img
        src={URL.createObjectURL(file)}
        alt=""
        className="w-full h-20 object-cover rounded-lg"
      />

      <button
        onClick={() => removeFile(i)}
        className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded-full hover:bg-red-600"
      >
        ✕
      </button>
    </div>
  ))}
</div>
</div>

            {/* EXTRAS */}
            <div>
              <p className="mb-2 font-semibold">Extras</p>

              <div className="grid grid-cols-2 gap-3">
  {[
    { key: "images", label: "Generación de imágenes" },
    { key: "video", label: "Generación de vídeo" },
    { key: "workflow", label: "Workflow personalizado" },
    { key: "api", label: "API local" },
  ].map((item) => (
    <div
      key={item.key}
      onClick={() => handleExtraChange(item.key)}
      className={`cursor-pointer rounded-xl p-4 border transition-all
        ${
          extras[item.key]
            ? "bg-blue-600 border-none text-white hover:bg-blue-500"
            : "bg-zinc-800 border-none text-gray-400 hover:bg-zinc-700"
        }`}
    >
      {item.label}
    </div>
  ))}
</div>
            </div>

            {/* DESCRIPCIÓN */}
            <TextArea
              label="Describe lo que necesitas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: estilo anime, personaje, marca, etc..."
            />

            {/* PRECIO */}
            <div className="bg-zinc-800 p-4 rounded-xl text-center">
              <p className="text-gray-400">Precio estimado</p>
              <p className="text-3xl font-bold text-white">
                €{calculateTotal()}
              </p>
            </div>

            {/* CTA */}
            <Button
  onClick={handleSubmit}
  className="bg-blue-600 text-white w-full hover:bg-blue-500"
>
  Enviar solicitud
</Button>

          </Card.Content>
        </Card>

      </div>
    </div>
  );
}