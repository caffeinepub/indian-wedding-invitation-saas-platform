import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import TemplateSelector from '../templates/TemplateSelector';
import ColorSchemePicker from '../templates/ColorSchemePicker';
import FontSelector from '../templates/FontSelector';
import BackgroundDecorationControls from '../templates/BackgroundDecorationControls';
import AnimationModeSelector from '../templates/AnimationModeSelector';
import { Palette, Type, Layers, Film, Layout, ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateThemeStepProps {
  onNext?: () => void;
  onBack?: () => void;
  hideNavigation?: boolean;
  invitationId?: string;
}

export default function TemplateThemeStep({ onNext, onBack, hideNavigation }: TemplateThemeStepProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-serif text-foreground mb-4">Template & Theme</h2>

        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-4">
            <TabsTrigger value="theme" className="flex flex-col items-center gap-0.5 py-2 text-xs">
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="color" className="flex flex-col items-center gap-0.5 py-2 text-xs">
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Color</span>
            </TabsTrigger>
            <TabsTrigger value="font" className="flex flex-col items-center gap-0.5 py-2 text-xs">
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Font</span>
            </TabsTrigger>
            <TabsTrigger value="decor" className="flex flex-col items-center gap-0.5 py-2 text-xs">
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Decor</span>
            </TabsTrigger>
            <TabsTrigger value="anim" className="flex flex-col items-center gap-0.5 py-2 text-xs">
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anim</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme">
            <ScrollArea className="h-96">
              <TemplateSelector />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="color">
            <ScrollArea className="h-96">
              <ColorSchemePicker />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="font">
            <ScrollArea className="h-96">
              <FontSelector />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="decor">
            <ScrollArea className="h-96">
              <BackgroundDecorationControls />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="anim">
            <ScrollArea className="h-96">
              <AnimationModeSelector />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {!hideNavigation && onNext && onBack && (
        <div className="flex justify-between px-6 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 border border-border text-foreground hover:bg-muted font-medium px-6 py-3 rounded-full transition-all min-h-[44px]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3 rounded-full transition-all shadow-gold min-h-[44px]"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
