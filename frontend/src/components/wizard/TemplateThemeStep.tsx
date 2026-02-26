import React from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import TemplateSelector from '@/components/templates/TemplateSelector';
import ColorSchemePicker from '@/components/templates/ColorSchemePicker';
import FontSelector from '@/components/templates/FontSelector';
import TemplatePreview from '@/components/templates/TemplatePreview';
import { BACKGROUND_CHOICES, TEMPLATES, getTemplateById } from '@/utils/templateDefinitions';
import {
  useGetThemeVariants,
  useSaveThemeVariant,
  useDeleteThemeVariant,
} from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Loader2,
  Trash2,
  BookmarkPlus,
  Bookmark,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import type { ThemeConfig } from '@/backend';

interface TemplateThemeStepProps {
  invitationId?: string;
}

export default function TemplateThemeStep({ invitationId }: TemplateThemeStepProps) {
  const { formData, updateFormData } = useInvitationForm();

  const { data: themeVariants = [], isLoading: variantsLoading } = useGetThemeVariants(
    invitationId ?? ''
  );
  const saveVariant = useSaveThemeVariant();
  const deleteVariant = useDeleteThemeVariant();

  const currentThemeConfig: ThemeConfig = {
    template: formData.selectedTemplate,
    colorScheme: formData.colorScheme,
    fontChoice: formData.fontChoice,
    backgroundChoice: formData.backgroundChoice,
  };

  const handleSaveAsSingle = () => {
    toast.success('Theme saved as your active template!');
  };

  const handleSaveAsVariant = async () => {
    if (!invitationId) {
      toast.info('Save your invitation first to store theme variants.');
      return;
    }
    try {
      await saveVariant.mutateAsync({
        invitationId,
        themeConfig: currentThemeConfig,
      });
      toast.success('Theme variant saved!');
    } catch {
      toast.error('Failed to save theme variant');
    }
  };

  const handleApplyVariant = (variant: ThemeConfig) => {
    updateFormData({
      selectedTemplate: variant.template,
      colorScheme: variant.colorScheme,
      fontChoice: variant.fontChoice,
      backgroundChoice: variant.backgroundChoice,
    });
    toast.success('Theme variant applied!');
  };

  const handleDeleteVariant = async (index: number) => {
    if (!invitationId) return;
    try {
      await deleteVariant.mutateAsync({
        invitationId,
        themeIndex: BigInt(index),
      });
      toast.success('Theme variant deleted');
    } catch {
      toast.error('Failed to delete theme variant');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Template &amp; Theme
        </h2>
        <p className="font-inter text-muted-foreground">
          Choose your perfect wedding aesthetic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Customization Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Selection */}
          <div className="luxury-card p-6">
            <h3 className="font-cinzel text-lg font-bold text-gold-dark mb-4">Choose Template</h3>
            <TemplateSelector
              selected={formData.selectedTemplate}
              onChange={(id) => updateFormData({ selectedTemplate: id })}
            />
          </div>

          {/* Color Scheme */}
          <div className="luxury-card p-6">
            <ColorSchemePicker
              selected={formData.colorScheme}
              onChange={(scheme) => updateFormData({ colorScheme: scheme })}
            />
          </div>

          {/* Font Selection */}
          <div className="luxury-card p-6">
            <FontSelector
              selected={formData.fontChoice}
              onChange={(font) => updateFormData({ fontChoice: font })}
            />
          </div>

          {/* Background */}
          <div className="luxury-card p-6">
            <h4 className="font-cinzel text-sm font-semibold tracking-wide text-foreground mb-3">
              Background Style
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BACKGROUND_CHOICES.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => updateFormData({ backgroundChoice: bg.id })}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.backgroundChoice === bg.id
                      ? 'border-gold shadow-gold bg-gold/5'
                      : 'border-border hover:border-gold/40'
                  }`}
                >
                  <p className="font-cinzel text-sm font-bold text-foreground">{bg.name}</p>
                  <p className="font-inter text-xs text-muted-foreground mt-0.5">{bg.description}</p>
                  {formData.backgroundChoice === bg.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Advanced Customization ── */}
          <div className="luxury-card p-6 space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-gold" />
              <h4 className="font-cinzel text-sm font-bold tracking-wide text-gold-dark">
                Advanced Customization
              </h4>
              <Badge variant="outline" className="text-[10px] font-cinzel border-gold/40 text-gold-dark px-1.5 py-0">
                NEW
              </Badge>
            </div>

            {/* Background Style Picker */}
            <div>
              <p className="font-cinzel text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Preview Background
              </p>
              <ToggleGroup
                type="single"
                value={formData.backgroundStyle}
                onValueChange={(val) => val && updateFormData({ backgroundStyle: val })}
                className="flex flex-wrap gap-2"
              >
                {[
                  { value: 'solid', label: 'Solid' },
                  { value: 'gradient', label: 'Gradient' },
                  { value: 'pattern', label: 'Pattern' },
                  { value: 'texture', label: 'Texture' },
                ].map((opt) => (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    className="font-cinzel text-xs tracking-wider rounded-full px-4 h-8 border border-border data-[state=on]:bg-gold data-[state=on]:text-foreground data-[state=on]:border-gold data-[state=on]:shadow-gold"
                  >
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Accent Intensity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-cinzel text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Accent Intensity
                </p>
                <span className="font-cinzel text-xs font-bold text-gold-dark">
                  {formData.accentIntensity}%
                </span>
              </div>
              <Slider
                min={50}
                max={150}
                step={5}
                value={[formData.accentIntensity]}
                onValueChange={([val]) => updateFormData({ accentIntensity: val })}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className="font-inter text-[10px] text-muted-foreground">Subtle</span>
                <span className="font-inter text-[10px] text-muted-foreground">Vivid</span>
              </div>
            </div>

            {/* Border / Frame Style */}
            <div>
              <p className="font-cinzel text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Frame Style
              </p>
              <ToggleGroup
                type="single"
                value={formData.borderStyle}
                onValueChange={(val) => val && updateFormData({ borderStyle: val })}
                className="flex flex-wrap gap-2"
              >
                {[
                  { value: 'none', label: 'None' },
                  { value: 'classic', label: 'Classic' },
                  { value: 'ornate', label: 'Ornate' },
                ].map((opt) => (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    className="font-cinzel text-xs tracking-wider rounded-full px-4 h-8 border border-border data-[state=on]:bg-gold data-[state=on]:text-foreground data-[state=on]:border-gold data-[state=on]:shadow-gold"
                  >
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Layout Density */}
            <div>
              <p className="font-cinzel text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Layout Density
              </p>
              <ToggleGroup
                type="single"
                value={formData.layoutDensity}
                onValueChange={(val) => val && updateFormData({ layoutDensity: val })}
                className="flex gap-2"
              >
                {[
                  { value: 'compact', label: 'Compact' },
                  { value: 'spacious', label: 'Spacious' },
                ].map((opt) => (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    className="font-cinzel text-xs tracking-wider rounded-full px-5 h-8 border border-border data-[state=on]:bg-gold data-[state=on]:text-foreground data-[state=on]:border-gold data-[state=on]:shadow-gold"
                  >
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {/* ── Save Theme Section ── */}
          <div className="luxury-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-4 h-4 text-gold" />
              <h4 className="font-cinzel text-sm font-bold tracking-wide text-gold-dark">
                Save Theme
              </h4>
            </div>

            <p className="font-inter text-xs text-muted-foreground mb-4">
              Save your current theme configuration as the active theme, or store it as a variant to switch between later.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                onClick={handleSaveAsSingle}
                className="btn-gold rounded-full font-cinzel text-xs tracking-wider flex-1"
              >
                <Bookmark className="w-3.5 h-3.5 mr-2" />
                Save as Single Theme
              </Button>
              <Button
                onClick={handleSaveAsVariant}
                disabled={saveVariant.isPending || !invitationId}
                variant="outline"
                className="rounded-full font-cinzel text-xs tracking-wider border-gold/40 text-gold-dark hover:bg-gold/5 flex-1"
              >
                {saveVariant.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                ) : (
                  <BookmarkPlus className="w-3.5 h-3.5 mr-2" />
                )}
                Save as Variant
              </Button>
            </div>

            {!invitationId && (
              <p className="font-inter text-xs text-muted-foreground/70 italic text-center mb-4">
                💡 Theme variants are available after creating your invitation
              </p>
            )}

            {/* Saved Variants */}
            {invitationId && (
              <div>
                <p className="font-cinzel text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">
                  Saved Variants ({themeVariants.length})
                </p>

                {variantsLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-inter text-xs">Loading variants...</span>
                  </div>
                ) : themeVariants.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-border rounded-xl">
                    <BookmarkPlus className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="font-inter text-xs text-muted-foreground">
                      No saved variants yet. Save your current theme as a variant to compare later.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="w-full">
                    <div className="flex gap-3 pb-3">
                      {themeVariants.map((variant, index) => (
                        <ThemeVariantCard
                          key={index}
                          variant={variant}
                          index={index}
                          onApply={() => handleApplyVariant(variant)}
                          onDelete={() => handleDeleteVariant(index)}
                          isDeleting={deleteVariant.isPending}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="font-cinzel text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4 text-center">
              Live Preview
            </h3>
            <TemplatePreview formData={formData} />

            {/* Preview meta info */}
            <div className="mt-4 p-3 rounded-xl bg-secondary/40 border border-border">
              <p className="font-cinzel text-xs font-bold text-gold-dark mb-1">
                {getTemplateById(formData.selectedTemplate).name}
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-[9px] font-inter border-gold/30 text-muted-foreground px-1.5 py-0">
                  {formData.backgroundStyle}
                </Badge>
                <Badge variant="outline" className="text-[9px] font-inter border-gold/30 text-muted-foreground px-1.5 py-0">
                  {formData.borderStyle} frame
                </Badge>
                <Badge variant="outline" className="text-[9px] font-inter border-gold/30 text-muted-foreground px-1.5 py-0">
                  {formData.layoutDensity}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeVariantCard({
  variant,
  index,
  onApply,
  onDelete,
  isDeleting,
}: {
  variant: ThemeConfig;
  index: number;
  onApply: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const template = TEMPLATES.find((t) => t.id === variant.template) ?? TEMPLATES[0];

  return (
    <div className="shrink-0 w-36 rounded-xl overflow-hidden border-2 border-border hover:border-gold/50 transition-all duration-200 bg-card">
      {/* Mini preview */}
      <div
        className="h-20 relative"
        style={{ background: template.previewGradient }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-[9px] font-bold tracking-wide"
            style={{
              fontFamily: template.headingFont,
              color: template.category === 'cinematic-dark' ? template.textColor : '#FFFFFF',
            }}
          >
            Variant {index + 1}
          </div>
          <div
            className="text-[8px] opacity-70 mt-0.5"
            style={{ color: template.category === 'cinematic-dark' ? template.textColor : '#FFFFFF' }}
          >
            {template.name}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-2 space-y-1.5">
        <p className="font-cinzel text-[9px] font-bold text-foreground truncate">{template.name}</p>
        <div className="flex gap-1">
          <Button
            size="sm"
            onClick={onApply}
            className="flex-1 h-6 text-[9px] font-cinzel tracking-wider rounded-full btn-gold px-2"
          >
            Apply
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            disabled={isDeleting}
            className="h-6 w-6 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            {isDeleting ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
