const { PrismaClient } = require('@prisma/client'); // Importa Prisma Client

const prisma = new PrismaClient(); // Crea una instancia de Prisma Client

async function checkDatabase() {
  try {
    // Intenta consultar la base de datos
    const users = await prisma.user.findMany(); // Cambia 'user' si tu modelo tiene otro nombre
    console.log(users); // Muestra los resultados en la consola
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos
  }
}

checkDatabase(); // Ejecuta la función
