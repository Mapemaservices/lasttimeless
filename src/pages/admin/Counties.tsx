import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminCounties() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingCounty, setEditingCounty] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: "",
    delivery_fee: "",
    estimated_days_min: "",
    estimated_days_max: "",
  });

  // Fetch counties
  const { data: counties, isLoading } = useQuery({
    queryKey: ["admin-counties"],
    queryFn: async () => {
      const { data, error } = await supabase.from("counties").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  // Add or update county
  const mutation = useMutation({
    mutationFn: async (county: any) => {
      if (county.id) {
        // Update
        const { error } = await supabase.from("counties").update(county).eq("id", county.id);
        if (error) throw error;
      } else {
        // Add
        const { error } = await supabase.from("counties").insert({
          name: county.name,
          delivery_fee: Number(county.delivery_fee),
          estimated_days_min: Number(county.estimated_days_min),
          estimated_days_max: Number(county.estimated_days_max),
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-counties"] });
      setEditingCounty(null);
      setForm({ name: "", delivery_fee: "", estimated_days_min: "", estimated_days_max: "" });
      toast({ title: "County saved!" });
    },
    onError: () => {
      toast({ title: "Error saving county", variant: "destructive" });
    },
  });

  // Delete county
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("counties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-counties"] });
      toast({ title: "County deleted!" });
    },
    onError: () => {
      toast({ title: "Error deleting county", variant: "destructive" });
    },
  });

  const handleEdit = (county: any) => {
    setEditingCounty(county);
    setForm({
      name: county.name,
      delivery_fee: county.delivery_fee,
      estimated_days_min: county.estimated_days_min,
      estimated_days_max: county.estimated_days_max,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      id: editingCounty?.id,
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Counties</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="County Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Delivery Fee (KSh)"
                type="number"
                value={form.delivery_fee}
                onChange={e => setForm(f => ({ ...f, delivery_fee: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Min Delivery Days"
                type="number"
                value={form.estimated_days_min}
                onChange={e => setForm(f => ({ ...f, estimated_days_min: e.target.value }))}
                required
              />
              <Input
                placeholder="Max Delivery Days"
                type="number"
                value={form.estimated_days_max}
                onChange={e => setForm(f => ({ ...f, estimated_days_max: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={mutation.isPending}>
                {editingCounty ? "Update County" : "Add County"}
              </Button>
              {editingCounty && (
                <Button type="button" variant="outline" onClick={() => { setEditingCounty(null); setForm({ name: "", delivery_fee: "", estimated_days_min: "", estimated_days_max: "" }); }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>

          <div>
            {isLoading ? (
              <div>Loading counties...</div>
            ) : (
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Fee (KSh)</th>
                    <th className="p-2 text-left">Min Days</th>
                    <th className="p-2 text-left">Max Days</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {counties?.map((county: any) => (
                    <tr key={county.id} className="border-t">
                      <td className="p-2">{county.name}</td>
                      <td className="p-2">{county.delivery_fee}</td>
                      <td className="p-2">{county.estimated_days_min}</td>
                      <td className="p-2">{county.estimated_days_max}</td>
                      <td className="p-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(county)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(county.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
