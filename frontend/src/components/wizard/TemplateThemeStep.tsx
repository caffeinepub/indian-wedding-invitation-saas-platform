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
    await deleteThemeMutation.mutateAsync({ invitationId, themeIndex: index });
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
          <span className="text-xs text-charcoal-300 font-medium">Live Preview</span>
        </div>
        <div className="h-48 overflow-hidden">
          <TemplatePreview />
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeSection === id
                ? 'bg-gold text-charcoal'
                : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div>
        {activeSection === 'template' && (
          <div>
            <h3 className="text-sm font-medium text-charcoal-200 mb-3">Choose Template</h3>
            <TemplateSelector />
          </div>
        )}

        {activeSection === 'color' && (
          <div>
            <h3 className="text-sm font-medium text-charcoal-200 mb-3">Color Scheme</h3>
            <ColorSchemePicker />
          </div>
        )}

        {activeSection === 'font' && (
          <div>
            <h3 className="text-sm font-medium text-charcoal-200 mb-3">Font Pairing</h3>
            <FontSelector
              value={formData.fontChoice}
              onChange={(fontId) => updateFormData({ fontChoice: fontId })}
            />
          </div>
        )}

        {activeSection === 'background' && (
          <div>
            <h3 className="text-sm font-medium text-charcoal-200 mb-3">Background Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUND_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateFormData({ backgroundChoice: style.id })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.backgroundChoice === style.id
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-700 bg-charcoal-800 hover:border-charcoal-600'
                  }`}
                >
                  <p className={`text-xs font-medium ${formData.backgroundChoice === style.id ? 'text-gold' : 'text-charcoal-200'}`}>
                    {style.label}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-0.5">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'saved' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-charcoal-200">Saved Themes</h3>
              {invitationId && (
                <button
                  onClick={() => setShowSaveInput(!showSaveInput)}
                  className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"
                >
                  <Save className="w-3 h-3" />
                  Save Current
                </button>
              )}
            </div>

            {showSaveInput && (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={saveThemeName}
                  onChange={(e) => setSaveThemeName(e.target.value)}
                  placeholder="Theme name..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-charcoal-800 border border-charcoal-600 text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-gold"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTheme()}
                />
                <button
                  onClick={handleSaveTheme}
                  disabled={!saveThemeName.trim() || saveThemeMutation.isPending}
                  className="px-3 py-1.5 text-xs rounded-lg bg-gold text-charcoal font-medium disabled:opacity-50 hover:bg-gold-light transition-colors"
                >
                  {savedSuccess ? <Check className="w-3 h-3" /> : 'Save'}
                </button>
              </div>
            )}

            {themeVariants.length === 0 ? (
              <p className="text-xs text-charcoal-400 text-center py-6">
                No saved themes yet.{invitationId ? ' Save your current theme to reuse it later.' : ''}
              </p>
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
    </div>
  );
}
