import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Save } from "lucide-react";

interface WebsiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
}

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_settings")
        .select("*")
        .order("key");
      
      if (error) throw error;
      
      // Initialize form data with current values
      const initialData: Record<string, string> = {};
      data.forEach((setting: WebsiteSetting) => {
        initialData[setting.key] = setting.value || '';
      });
      setFormData(initialData);
      
      return data as WebsiteSetting[];
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async (data: { key: string; value: string }) => {
      const { error } = await supabase
        .from("website_settings")
        .update({ value: data.value, updated_at: new Date().toISOString() })
        .eq("key", data.key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings updated",
        description: "Website settings have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      queryClient.invalidateQueries({ queryKey: ["website-settings"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating settings:", error);
    },
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      for (const setting of settings) {
        if (formData[setting.key] !== setting.value) {
          await updateSettingMutation.mutateAsync({
            key: setting.key,
            value: formData[setting.key] || ''
          });
        }
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  const contactSettings = settings?.filter(s => s.key.startsWith('contact_')) || [];
  const mpesaSettings = settings?.filter(s => s.key.startsWith('mpesa_')) || [];
  const otherSettings = settings?.filter(s => !s.key.startsWith('contact_') && !s.key.startsWith('mpesa_')) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure website settings and business information
          </p>
        </div>
        <Button onClick={handleSave} disabled={updateSettingMutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {updateSettingMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactSettings.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key}>{setting.description}</Label>
                <Input
                  id={setting.key}
                  value={formData[setting.key] || ''}
                  onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  placeholder={setting.description}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* MPESA Settings */}
        <Card>
          <CardHeader>
            <CardTitle>MPESA Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mpesaSettings.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key}>{setting.description}</Label>
                <Input
                  id={setting.key}
                  value={formData[setting.key] || ''}
                  onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  placeholder={setting.description}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other Settings */}
        {otherSettings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {otherSettings.map((setting) => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.key}>{setting.description}</Label>
                  {setting.key === 'about_text' ? (
                    <Textarea
                      id={setting.key}
                      value={formData[setting.key] || ''}
                      onChange={(e) => handleInputChange(setting.key, e.target.value)}
                      placeholder={setting.description}
                      rows={4}
                    />
                  ) : (
                    <Input
                      id={setting.key}
                      value={formData[setting.key] || ''}
                      onChange={(e) => handleInputChange(setting.key, e.target.value)}
                      placeholder={setting.description}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
