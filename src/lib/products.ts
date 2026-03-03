import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  created_at: string;
  title: string;
  handle: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  images: string[] | null;
  category: string | null;
  tags: string[] | null;
  is_active: boolean;
  sort_order: number | null;
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: false });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data as Product[];
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("handle", handle)
    .eq("is_active", true)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data as Product;
}

export async function createProduct(product: Omit<Product, "id" | "created_at">): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();
  if (error) {
    console.error("Error creating product:", error);
    return null;
  }
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Error updating product:", error);
    return null;
  }
  return data as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }
  return true;
}

export function generateHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
