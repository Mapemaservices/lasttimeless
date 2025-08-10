-- Add transaction_code column to orders table
ALTER TABLE public.orders 
ADD COLUMN transaction_code text;