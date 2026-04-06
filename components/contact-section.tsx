"use client"

import type { SubmissionError } from "@formspree/core"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="scroll-mt-24 border-t border-border bg-muted/30 py-20 md:py-28 lg:scroll-mt-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {t("contact.kicker")}
              </span>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
                {t("contact.h2")}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t("contact.intro")}
              </p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">{t("contact.directEmail")}</span>{" "}
                <a
                  href="mailto:info@eco-vidadesigns.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  info@eco-vidadesigns.com
                </a>
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">{t("contact.whatsappLabel")}</span>{" "}
                <a
                  href="https://wa.me/18026968230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  +1 802 696 8230
                </a>
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <div
                className="rounded-lg border border-border bg-background p-8 shadow-sm"
                role="status"
              >
                <p className="font-medium text-foreground">
                  {t("contact.successTitle")}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t("contact.successBody")}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={reset}
                >
                  {t("contact.sendAnother")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-muted/30 py-20 md:py-28 lg:scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t("contact.kicker")}
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
              {t("contact.h2")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("contact.intro")}
            </p>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">{t("contact.directEmail")}</span>{" "}
              <a
                href="mailto:info@eco-vidadesigns.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                info@eco-vidadesigns.com
              </a>
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">{t("contact.whatsappLabel")}</span>{" "}
              <a
                href="https://wa.me/18026968230"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                +1 802 696 8230
              </a>
            </p>
            <p className="mt-4 rounded-md border border-border bg-background/80 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
              {t("contact.notice")}
            </p>
          </div>

          <div className="mt-12 lg:mt-0">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="scroll-mt-28 rounded-lg border border-border bg-background p-6 shadow-sm md:p-8 lg:scroll-mt-32"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("form.fullName")}</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={t("form.placeholder.name")}
                    disabled={state.submitting}
                    className={fieldErrorClassName(state.errors, "name")}
                  />
                  <ValidationError
                    errors={state.errors}
                    field="name"
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">{t("form.email")}</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("form.placeholder.email")}
                    disabled={state.submitting}
                    className={fieldErrorClassName(state.errors, "email")}
                  />
                  <ValidationError
                    errors={state.errors}
                    field="email"
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">{t("form.phoneOptional")}</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t("form.placeholder.phone")}
                    disabled={state.submitting}
                    className={fieldErrorClassName(state.errors, "phone")}
                  />
                  <ValidationError
                    errors={state.errors}
                    field="phone"
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-type">{t("form.projectType")}</Label>
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
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-location">{t("form.siteRegion")}</Label>
                  <Input
                    id="contact-location"
                    name="location"
                    placeholder={t("form.placeholder.location")}
                    disabled={state.submitting}
                    className={fieldErrorClassName(state.errors, "location")}
                  />
                  <ValidationError
                    errors={state.errors}
                    field="location"
                    className="text-sm text-destructive"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("form.projectSummary")}</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t("form.placeholder.message")}
                    className={cn(
                      "min-h-[120px]",
                      fieldErrorClassName(state.errors, "message")
                    )}
                    disabled={state.submitting}
                  />
                  <ValidationError
                    errors={state.errors}
                    field="message"
                    className="text-sm text-destructive"
                  />
                </div>
              </div>
              {state.errors?.getFormErrors().length ? (
                <div
                  className="mt-5 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  {state.errors.getFormErrors().map((err) => (
                    <p key={err.message}>{err.message}</p>
                  ))}
                </div>
              ) : null}
              <Button
                type="submit"
                className="mt-8 w-full sm:w-auto"
                size="lg"
                disabled={state.submitting}
              >
                {state.submitting ? t("form.sending") : t("form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
