// page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="lp-hero min-h-[80vh] flex items-center justify-center relative">
        <div className="lp-hero-glow" />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-6xl font-bold mb-6">Runereum</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The intelligent AI agent for optimizing your Bitcoin Rune operations
          </p>
          <button className="lp-button">Get Started</button>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle>Phase 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Initialize and connect with Bitcoin network for Rune operations</p>
              </CardContent>
            </Card>

            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle>Phase 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p>AI-powered analysis and optimization of Rune transactions</p>
              </CardContent>
            </Card>

            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle>Phase 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Advanced management and automated Rune strategies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}