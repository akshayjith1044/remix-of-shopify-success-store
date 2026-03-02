import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminVideos } from "@/components/admin/AdminVideos";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { Film, Star, ShieldCheck } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="videos" className="gap-2">
                <Film className="h-4 w-4" /> UGC Videos
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <Star className="h-4 w-4" /> Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <AdminVideos />
            </TabsContent>
            <TabsContent value="reviews">
              <AdminReviews />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
