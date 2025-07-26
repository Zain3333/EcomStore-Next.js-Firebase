import React from "react";

export default function page() {
  const products = [
    {
      name: "Samsung Galaxy Smartphone",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0",
      rating: 4.5,
      description:
        "Latest Samsung smartphone with high-speed performance and sleek body.",
      category: "Mobiles",
    },
    {
      name: "Wireless Headphones",
      price: 139.99,
      image:
        "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
      rating: 4.7,
      description:
        "Comfortable over-ear wireless headphones with great sound quality.",
      category: "Electronics",
    },
    {
      name: "Gaming Keyboard RGB",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1265&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      description:
        "RGB mechanical keyboard for competitive gaming performance.",
      category: "Electronics",
    },
    {
      name: "Echo Dot Smart Speaker",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1667543239971-7d8a0393b4ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      description:
        "Compact smart speaker with voice control and Alexa built-in.",
      category: "Appliances",
    },
    {
      name: "Stand Mixer Machine",
      price: 239.99,
      image:
        "https://images.unsplash.com/photo-1547091267-6b2be403a763?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      description: "High-powered kitchen mixer for baking and whipping.",
      category: "Home",
    },
    {
      name: "Professional DSLR Camera",
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1593449650811-f44191dc0420?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      description:
        "Capture stunning shots with this DSLR camera for professionals.",
      category: "Electronics",
    },
    {
      name: "Fitness Smartwatch",
      price: 179.99,
      image:
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0",
      rating: 4.4,
      description: "Track your health with this waterproof smartwatch.",
      category: "Fashion",
    },
    {
      name: "Studio Headphones",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.1.0",
      rating: 4.2,
      description: "High-precision wired headphones for studio monitoring.",
      category: "Electronics",
    },
    {
      name: "VR Experience Headset",
      price: 299.99,
      image:
        "https://plus.unsplash.com/premium_photo-1677158265072-5d15db9e23b2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      description: "Virtual Reality headset with immersive experience.",
      category: "Electronics",
    },
    {
      name: "White Fashion Sneakers",
      price: 109.99,
      image:
        "https://images.unsplash.com/photo-1608230616491-5d696aa9fe52?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.3,
      description: "Stylish and comfortable sneakers for everyday wear.",
      category: "Fashion",
    },
    {
      name: "Home Gym Dumbbell Set",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1685633225047-92be467dbe57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      description: "Weight set for strength training at home.",
      category: "Sports",
    },
    {
      name: "Executive Office Chair",
      price: 259.99,
      image:
        "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      description: "Ergonomic chair with lumbar support and mesh back.",
      category: "Home",
    },
    {
      name: "Classic Leather Handbag",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.4,
      description: "Elegant leather handbag ideal for formal and casual use.",
      category: "Fashion",
    },
    {
      name: "RGB Gaming Mouse",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1628832307345-7404b47f1751?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.1.0",
      rating: 4.6,
      description: "Responsive gaming mouse with RGB lighting and DPI control.",
      category: "Electronics",
    },
    {
      name: "27-inch LED Monitor",
      price: 219.99,
      image:
        "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      description:
        "Full HD widescreen LED monitor for gaming and productivity.",
      category: "Electronics",
    },
  ];
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dummy Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 flex flex-col">
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="mb-2 font-bold">${product.price}</p>
            <img src={product.image} alt={product.name} className="mb-2" />
            <p className="text-sm text-gray-500">Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
