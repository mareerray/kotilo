import { supabase } from './supabase';
import type { Item } from '../types/item';

export type NewItem = Omit<Item, 'id'>; // Omit<Item, "id"> uses whatever fields your type has.

export async function getItems(): Promise<Item[]> {
    const { data, error } = await supabase
    .from('items')
    .select('*')
    .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function addItem(newItem: NewItem): Promise<Item> {
    const { data, error } = await supabase
    .from('items')
    .insert(newItem)
    .select()
    .single();
    if (error) throw error;
    return data;
}

export async function updateItem(id: number, updatedItem: Partial<Item>): Promise<Item> {
    const { data, error } = await supabase
    .from('items')
    .update(updatedItem)
    .eq('id', id)
    .select()
    .single();
    if (error) throw error;
    return data;
}

// From the table items, delete the row where id equals this id. If Supabase reports an error, throw it.
export async function deleteItem(id: number): Promise<void> {
    const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id);
    if (error) throw error;
}