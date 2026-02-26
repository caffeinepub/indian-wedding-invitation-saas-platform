import React, { useState } from 'react';
import { useInvitationForm } from '../../context/InvitationFormContext';
import TemplateSelector from '../templates/TemplateSelector';
import ColorSchemePicker from '../templates/ColorSchemePicker';
import FontSelector from '../templates/FontSelector';
import TemplatePreview from '../templates/TemplatePreview';
import { useGetThemeVariants, useSaveThemeVariant, useDeleteThemeVariant } from '../../hooks/useQueries';
import { ThemeConfig } from '../../backend';
import { Palette, Type, Image, Sliders, Save, Eye, Trash2, Check } from 'lucide-react';

const BACKGROUND_STYLES = [
  { id: 'minimal', label: 'Minimal', description: 'Clean white background' },
  { id: 'floral', label: 'Floral', description: 'Subtle floral patterns' },
  { id: 'paisley', label: 'Paisley', description: 'Traditional paisley motifs' },
  { id: 'watercolor', label: 'Watercolor', description: 'Soft watercolor washes' },
  { id: 'dark-floral', label: 'Dark Floral', description: 'Dramatic dark with florals' },
  { id: 'dark-minimal', label: 'Dark Minimal', description: 'Sleek dark background' },
];

interface ThemeVariantCardProps {
  variant: ThemeConfig;
  index: number;
  onApply: () => void;
  onDelete: () => void;
}

function ThemeVariantCard({ variant, index, onApply, onDelete }: ThemeVariantCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:border-gold-500/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ivory-100 truncate">{variant.name || `Theme ${index + 1}`}</p>
        <p className="text-xs text-charcoal-400 truncate">{variant.template} · {variant.colorScheme}</p>
      </div>
      <div className="flex gap-2 ml-3 flex-shrink-0">
        <button
          onClick={onApply}
          className="text-xs px-2 py-1 rounded bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 transition-colors"
        >
          Apply
        </button>
        <button
          onClick={onDelete}
          className="text-xs px-2 py-1 rounded bg-crimson-500/20 text-crimson-400 hover:bg-crimson-500/30 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export interface TemplateThemeStepProps {
  invitationId?: string;
  // Legacy wizard props — kept for backward compatibility but unused in this component
  onNext?: () => void;
  onBack?: () => void;
  hideNavigation?: boolean;
}

export default function TemplateThemeStep({ invitationId }: TemplateThemeStepProps) {
  const { formData, updateFormData } = useInvitationForm();
  const [activeSection, setActiveSection] = useState<'template' | 'color' | 'font' | 'background' | 'saved'>('template');
  const [saveThemeName, setSaveThemeName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { data: themeVariants = [] } = useGetThemeVariants(invitationId || '');
  const saveThemeMutation = useSaveThemeVariant();
  const deleteThemeMutation = useDeleteThemeVariant();

  const handleSaveTheme = async () => {
    if (!invitationId || !saveThemeName.trim()) return;
    const themeConfig: ThemeConfig = {
      name: saveThemeName.trim(),
      template: formData.selectedTemplate,
      colorScheme: formData.colorScheme,
      fontChoice: formData.fontChoice,
      backgroundChoice: formData.backgroundChoice || 'minimal',
    };
    await saveThemeMutation.mutateAsync({ invitationId, themeConfig });
    setSaveThemeName('');
    setShowSaveInput(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleApplyVariant = (variant: ThemeConfig) => {
    updateFormData({
      selectedTemplate: variant.template,
      colorScheme: variant.colorScheme,
      fontChoice: variant.fontChoice,
      backgroundChoice: variant.backgroundChoice,
    });
  };

  const handleDeleteVariant = async (index: number) => {
    if (!invitationId) return;
    await deleteThemeMutation.mutateAsync({ invitationId, themeIndex: BigInt(index) });
  };

  const sections = [
    { id: 'template' as const, label: 'Template', icon: Image },
    { id: 'color' as const, label: 'Colors', icon: Palette },
    { id: 'font' as const, label: 'Fonts', icon: Type },
    { id: 'background' as const, label: 'Background', icon: Sliders },
    { id: 'saved' as const, label: 'Saved', icon: Save },
  ];

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <div className="rounded-xl overflow-hidden border border-charcoal-700 bg-charcoal-900/50">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-charcoal-700 bg-charcoal-800/50">
          <Eye className="w-4 h-4 text-gold-400" />
          <span className="text-sm font-medium text-ivory-200">Live Preview</span>
          <span className="text-xs text-charcoal-400 ml-1">— updates instantly as you make changes</span>
        </div>
        <div className="p-4">
          <TemplatePreview />
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex gap-1 bg-charcoal-800 rounded-lg p-1 overflow-x-auto">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
              activeSection === id
                ? 'bg-gold-500 text-charcoal-900'
                : 'text-charcoal-300 hover:text-ivory-100 hover:bg-charcoal-700'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Template Selection — TemplateSelector reads/writes context internally */}
      {activeSection === 'template' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ivory-100">Choose Template</h3>
          <TemplateSelector />
        </div>
      )}

      {/* Color Scheme — ColorSchemePicker reads/writes context internally */}
      {activeSection === 'color' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ivory-100">Color Scheme</h3>
          <ColorSchemePicker />
        </div>
      )}

      {/* Font Pairing */}
      {activeSection === 'font' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ivory-100">Font Pairing</h3>
          <FontSelector
            value={formData.fontChoice}
            onChange={(fontId) => updateFormData({ fontChoice: fontId })}
          />
        </div>
      )}

      {/* Background Style */}
      {activeSection === 'background' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ivory-100">Background Style</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BACKGROUND_STYLES.map((style) => {
              const isSelected = (formData.backgroundChoice || 'minimal') === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => updateFormData({ backgroundChoice: style.id })}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-gold-500 bg-gold-500/10'
                      : 'border-charcoal-700 bg-charcoal-800/50 hover:border-gold-400/50'
                  }`}
                >
                  <p className={`text-sm font-medium ${isSelected ? 'text-gold-400' : 'text-ivory-200'}`}>
                    {style.label}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-0.5">{style.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Saved Themes */}
      {activeSection === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ivory-100">Saved Themes</h3>
            {invitationId && (
              <button
                onClick={() => setShowSaveInput(!showSaveInput)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gold-500/20 text-gold-400 hover:bg-gold-500/30 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save Current
              </button>
            )}
          </div>

          {showSaveInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={saveThemeName}
                onChange={(e) => setSaveThemeName(e.target.value)}
                placeholder="Theme name (e.g. Royal Gold)"
                className="flex-1 px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-600 text-ivory-100 placeholder-charcoal-400 text-sm focus:outline-none focus:border-gold-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTheme()}
              />
              <button
                onClick={handleSaveTheme}
                disabled={!saveThemeName.trim() || saveThemeMutation.isPending}
                className="px-3 py-2 rounded-lg bg-gold-500 text-charcoal-900 font-medium text-sm hover:bg-gold-400 disabled:opacity-50 transition-colors"
              >
                {saveThemeMutation.isPending ? '...' : 'Save'}
              </button>
            </div>
          )}

          {savedSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-2 rounded-lg">
              <Check className="w-4 h-4" />
              Theme saved successfully!
            </div>
          )}

          {themeVariants.length === 0 ? (
            <div className="text-center py-8 text-charcoal-400">
              <Save className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No saved themes yet.</p>
              <p className="text-xs mt-1">Save your current theme to reuse it later.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {themeVariants.map((variant, index) => (
                <ThemeVariantCard
                  key={index}
                  variant={variant}
                  index={index}
                  onApply={() => handleApplyVariant(variant)}
                  onDelete={() => handleDeleteVariant(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
