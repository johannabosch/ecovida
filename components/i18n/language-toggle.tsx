"use client"

import { Check, ChevronDown, Languages } from "lucide-react"
import { useLanguage } from "@/components/i18n/language-provider"
import { useT } from "@/lib/i18n/use-t"
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT_LABELS, type Locale } from "@/lib/i18n/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LanguageToggleProps = {
  variant?: "header" | "footer"
  className?: string
}

export function LanguageToggle({
  variant = "header",
  className,
}: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage()
  const t = useT()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={variant === "header" ? "outline" : "ghost"}
          size="sm"
          className={cn(
            variant === "header" &&
              "h-7 gap-1 border-border/90 px-2 text-[11px] font-medium shadow-sm",
            variant === "footer" &&
              "h-auto gap-1.5 border-border/70 bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
            className
          )}
          aria-label={t("common.language")}
        >
          {variant === "header" ? (
            <>
              <Languages className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
              <span>{LOCALE_SHORT_LABELS[locale]}</span>
              <ChevronDown className="h-2.5 w-2.5 shrink-0 opacity-70" aria-hidden />
            </>
          ) : (
            <>
              <Languages className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              <span className="max-w-[10rem] truncate sm:max-w-none">
                {LOCALE_LABELS[locale]}
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[200001] min-w-[11rem]"
      >
        {LOCALES.map((code) => (
          <DropdownMenuItem
            key={code}
            className="gap-2"
            onClick={() => setLocale(code as Locale)}
          >
            <Check
              className={cn(
                "h-4 w-4 shrink-0",
                code === locale ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
            <span>{LOCALE_LABELS[code]}</span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
              {code}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
