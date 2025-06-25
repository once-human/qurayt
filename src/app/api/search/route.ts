// Placeholder for search API route
export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: 'Search route works!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 