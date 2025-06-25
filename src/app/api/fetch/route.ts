// Placeholder for Dribbble fetch API route
export async function GET() {
  return new Response(JSON.stringify({ message: 'Dribbble fetch route works!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 