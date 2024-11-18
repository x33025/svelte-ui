export async function GET() {
    const robots = `
      User-agent: *
      Allow: /
      Sitemap: https://svelte-ui.dev/sitemap.xml
    `;
  
    return new Response(robots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  