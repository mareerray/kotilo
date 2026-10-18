import { supabase } from './supabase';
import type { Item } from '../types/item';

// A new item has no id yet: the database creates it.
// Omit<Item, "id"> uses whatever fields your type has.
export type NewItem = Omit<Item, 'id'>; 


// Read all items, newest first.
export async function getItems(): Promise<Item[]> {
    const { data, error } = await supabase
    .from('items')
    .select('*')
    .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
}


// Insert one row and return it, including its new id.
export async function addItem(newItem: NewItem): Promise<Item> {
    const { data, error } = await supabase
    .from('items')
    .insert(newItem)
    .select()
    .single();
    if (error) throw error;
    return data;
}

// Update only the row where id matches. Never send id in the changes.
export async function updateItem(id: number, changes: Partial<NewItem>): Promise<Item> {
    const { data, error } = await supabase
    .from('items')
    .update(changes)
    .eq('id', id) // a filter to update the row where id equals this id
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
    .eq('id', id); // a filter to delete the row where id equals this id
    if (error) throw error;
}