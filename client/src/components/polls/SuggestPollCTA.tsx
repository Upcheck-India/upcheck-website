import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define a local custom DialogContent that matches shadcn but overrides backdrop classes and disables autofocus scroll jumps
const LocalDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    {/* Custom soft backdrop overlay with blur */}
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4 text-cyan-800" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
LocalDialogContent.displayName = "LocalDialogContent";

export default function SuggestPollCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTopic("");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTopic("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    toast({
      title: "Suggestion Received",
      description: "Thank you! Your topic suggestion has been received.",
    });

    setIsOpen(false);
    setTopic("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 200) {
      setTopic(val);
    }
  };

  return (
    <section className="py-24 px-6 bg-background relative border-t border-border/40 text-center overflow-hidden">
      {/* Dynamic gradient background that slowly appears on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(circle at center, rgba(0, 201, 228, 0.05) 0%, rgba(0, 103, 177, 0.02) 60%, transparent 100%)"
        }}
      />

      {/* Decorative static blurred backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#00C9E4]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Wrapper Container with Scale Entrance */}
      <motion.div
        initial={{ scale: 0.96 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto max-w-2xl relative z-10 flex flex-col items-center space-y-6"
      >
        {/* Soft pulsing icon wrapper (stagger 1) */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
        >
          <Lightbulb className="w-7 h-7 text-[#00B4D8] animate-pulse" />
        </motion.div>

        {/* Heading (stagger 2) */}
        <motion.h2
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl md:text-4xl font-bold leading-tight text-foreground"
          data-testid="suggest-poll-title"
        >
          Have a Poll Topic in Mind?
        </motion.h2>

        {/* Paragraph content (stagger 3) */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
        >
          If there is a specific aquaculture trend, stocking practice, or feed efficiency challenge you want peer data on, suggest it to our research team. We update active topics weekly.
        </motion.p>

        {/* Submit button micro-interaction (stagger 4) */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          whileHover={{
            y: -3,
            scale: 1.03,
            filter: "drop-shadow(0 10px 15px rgba(0, 201, 228, 0.25))",
          }}
          whileTap={{ scale: 0.97 }}
          className="pt-4"
        >
          <Button
            size="lg"
            className="font-semibold relative overflow-hidden px-8 animate-none"
            style={{
              background: "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)",
              border: "none"
            }}
            data-testid="button-suggest-topic"
            onClick={() => setIsOpen(true)}
          >
            Suggest a Topic
          </Button>
        </motion.div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <LocalDialogContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[440px] rounded-[20px] border border-cyan-200/50 bg-gradient-to-br from-sky-50/95 to-cyan-50/95 backdrop-blur-md shadow-2xl p-6 md:p-8"
        >
          <DialogHeader className="space-y-1.5 text-left pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1 block">
              UpCheck Community Suggestion
            </span>
            <DialogTitle className="text-xl md:text-2xl font-bold leading-tight text-primary">
              Suggest a Poll Topic
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600 leading-relaxed">
              Have an idea for a community poll? Tell us what you'd like to see.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Textarea
                value={topic}
                onChange={handleChange}
                placeholder="Enter your poll topic..."
                autoFocus
                className="resize-none min-h-[72px] rounded-xl p-3 border-cyan-200/60 bg-white/70 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 shadow-sm"
              />
              <div className="text-xs text-muted-foreground text-right mt-1.5 font-medium">
                {topic.length}/200
              </div>
            </div>

            <DialogFooter className="pt-2 flex flex-row justify-end gap-3 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="rounded-xl px-5 border-cyan-200 text-cyan-800 hover:bg-cyan-50/50 font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!topic.trim()}
                className="rounded-xl px-6 font-semibold shadow-md transition-all duration-200"
                style={{
                  background: topic.trim()
                    ? "linear-gradient(90deg, #00C9E4 0%, #0067B1 100%)"
                    : "hsl(var(--muted))",
                  border: "none",
                  color: topic.trim() ? "white" : "hsl(var(--muted-foreground))"
                }}
              >
                Submit Topic
              </Button>
            </DialogFooter>
          </form>
        </LocalDialogContent>
      </Dialog>
    </section>
  );
}
