"use client"

import type { SubmissionError } from "@formspree/core"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FORMSPREE_FORM_ID } from "@/lib/formspree"
import { useT } from "@/lib/i18n/use-t"
import { cn } from "@/lib/utils"

type InquiryFormValues = {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
}

function fieldErrorClassName(
  errors: SubmissionError<InquiryFormValues> | null,
  field: keyof InquiryFormValues
) {
  if (!errors) return ""
  return errors.getFieldErrors(field).length > 0 ? "border-destructive" : ""
}

type InquiryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InquiryModal({ open, onOpenChange }: InquiryModalProps) {
  const t = useT()
  const [state, handleSubmit, reset] = useForm<InquiryFormValues>(
    FORMSPREE_FORM_ID,
    {
      data: {
        _subject: "Eco-Vida Designs — Consultation request (website)",
      },
    }
  )

  function handleDialogOpenChange(next: boolean) {
    if (!next) {
      reset()
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        className="max-h-[min(90vh,40rem)] overflow-y-auto sm:max-w-lg"
        showCloseButton
        onPointerDownOutside={(e) => {
          if (state.submitting) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (state.submitting) e.preventDefault()
        }}
      >
        {state.succeeded ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("inquiry.successTitle")}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {t("inquiry.successBody")}
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              className="mt-2 w-full sm:w-auto"
              onClick={() => handleDialogOpenChange(false)}
            >
              {t("inquiry.close")}
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl sm:text-2xl">
                {t("inquiry.title")}
              </DialogTitle>
              <DialogDescription>{t("inquiry.desc")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inquiry-name">{t("form.fullName")}</Label>
                <Input
                  id="inquiry-name"
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
                <Label htmlFor="inquiry-email">{t("form.email")}</Label>
                <Input
                  id="inquiry-email"
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
                <Label htmlFor="inquiry-phone">{t("form.phoneOptional")}</Label>
                <Input
                  id="inquiry-phone"
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
                <Label htmlFor="inquiry-type">{t("form.projectType")}</Label>
                <select
                  id="inquiry-type"
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
                <Label htmlFor="inquiry-location">{t("form.siteRegion")}</Label>
                <Input
                  id="inquiry-location"
                  name="location"
                  placeholder={t("inquiry.placeholder.location")}
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
                <Label htmlFor="inquiry-message">{t("inquiry.visionLabel")}</Label>
                <Textarea
                  id="inquiry-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t("inquiry.placeholder.message")}
                  className={cn(
                    "min-h-[120px] resize-y",
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
              {state.errors?.getFormErrors().length ? (
                <div
                  className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  {state.errors.getFormErrors().map((err) => (
                    <p key={err.message}>{err.message}</p>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  disabled={state.submitting}
                  onClick={() => handleDialogOpenChange(false)}
                >
                  {t("inquiry.cancel")}
                </Button>
                <Button type="submit" disabled={state.submitting} size="lg">
                  {state.submitting ? t("form.sending") : t("inquiry.send")}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
