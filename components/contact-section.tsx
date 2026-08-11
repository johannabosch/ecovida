"use client"

import type { SubmissionError } from "@formspree/core"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact"
import { FORMSPREE_FORM_ID } from "@/lib/formspree"
import { useT } from "@/lib/i18n/use-t"
import { cn } from "@/lib/utils"

type ContactFormValues = {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
}

function fieldErrorClassName(
  errors: SubmissionError<ContactFormValues> | null,
  field: keyof ContactFormValues
) {
  if (!errors) return ""
  return errors.getFieldErrors(field).length > 0 ? "border-destructive" : ""
}

function ContactIntro() {
  const t = useT()
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <span className="text-xs tracking-widest text-muted-foreground uppercase">
        {t("contact.kicker")}
      </span>
      <h2 className="mt-2 font-serif text-2xl tracking-tight text-foreground md:text-3xl">
        {t("contact.h2")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t("contact.intro")}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{t("contact.whatsappLabel")}</span>{" "}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {WHATSAPP_DISPLAY}
        </a>
      </p>
    </div>
  )
}

export function ContactSection() {
  const t = useT()
  const [state, handleSubmit, reset] = useForm<ContactFormValues>(
    FORMSPREE_FORM_ID,
    {
      data: {
        _subject: "Eco-Vida Designs — Website inquiry",
      },
    }
  )

  const sectionClass =
    "scroll-mt-24 border-t border-border/50 bg-background py-12 md:py-14 lg:scroll-mt-28"

  if (state.succeeded) {
    return (
      <section id="contact" className={sectionClass}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <ContactIntro />
            <div
              className="rounded-xl border border-border/60 bg-background p-5 shadow-sm md:p-6"
              role="status"
            >
              <p className="font-medium text-foreground">{t("contact.successTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("contact.successBody")}
              </p>
              <Button type="button" variant="outline" className="mt-5" size="sm" onClick={reset}>
                {t("contact.sendAnother")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className={sectionClass}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <ContactIntro />
            <p className="mt-4 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
              {t("contact.notice")}
            </p>
          </div>

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="scroll-mt-28 rounded-xl border border-border/60 bg-background p-5 shadow-sm md:p-6 lg:scroll-mt-32"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="contact-name" className="text-xs">
                  {t("form.fullName")}
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t("form.placeholder.name")}
                  disabled={state.submitting}
                  className={cn("h-9", fieldErrorClassName(state.errors, "name"))}
                />
                <ValidationError
                  errors={state.errors}
                  field="name"
                  className="text-xs text-destructive"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email" className="text-xs">
                  {t("form.email")}
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("form.placeholder.email")}
                  disabled={state.submitting}
                  className={cn("h-9", fieldErrorClassName(state.errors, "email"))}
                />
                <ValidationError
                  errors={state.errors}
                  field="email"
                  className="text-xs text-destructive"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-phone" className="text-xs">
                  {t("form.phoneOptional")}
                </Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t("form.placeholder.phone")}
                  disabled={state.submitting}
                  className={cn("h-9", fieldErrorClassName(state.errors, "phone"))}
                />
                <ValidationError
                  errors={state.errors}
                  field="phone"
                  className="text-xs text-destructive"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-type" className="text-xs">
                  {t("form.projectType")}
                </Label>
                <select
                  id="contact-type"
                  name="projectType"
                  required
                  disabled={state.submitting}
                  className={cn(
                    "border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
                    state.submitting && "cursor-not-allowed opacity-60",
                    fieldErrorClassName(state.errors, "projectType")
                  )}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("form.selectCategory")}
                  </option>
                  <option value="residential">{t("form.residential")}</option>
                  <option value="resort">{t("form.resort")}</option>
                  <option value="commercial">{t("form.commercial")}</option>
                  <option value="masterplan">{t("form.masterplan")}</option>
                  <option value="other">{t("form.other")}</option>
                </select>
                <ValidationError
                  errors={state.errors}
                  field="projectType"
                  className="text-xs text-destructive"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-location" className="text-xs">
                  {t("form.siteRegion")}
                </Label>
                <Input
                  id="contact-location"
                  name="location"
                  placeholder={t("form.placeholder.location")}
                  disabled={state.submitting}
                  className={cn("h-9", fieldErrorClassName(state.errors, "location"))}
                />
                <ValidationError
                  errors={state.errors}
                  field="location"
                  className="text-xs text-destructive"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="contact-message" className="text-xs">
                  {t("form.projectSummary")}
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("form.placeholder.message")}
                  className={cn(
                    "min-h-[96px] resize-y",
                    fieldErrorClassName(state.errors, "message")
                  )}
                  disabled={state.submitting}
                />
                <ValidationError
                  errors={state.errors}
                  field="message"
                  className="text-xs text-destructive"
                />
              </div>
            </div>
            {state.errors?.getFormErrors().length ? (
              <div
                className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                role="alert"
              >
                {state.errors.getFormErrors().map((err) => (
                  <p key={err.message}>{err.message}</p>
                ))}
              </div>
            ) : null}
            <Button
              type="submit"
              className="mt-5 w-full sm:w-auto"
              size="default"
              disabled={state.submitting}
            >
              {state.submitting ? t("form.sending") : t("form.submit")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
