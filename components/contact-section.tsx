"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
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
              Contact
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
              Schedule your consultation
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Share a brief overview of your project. We review every inquiry and
              respond with next steps for an introductory conversation.
            </p>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Direct email:</span>{" "}
              <a
                href="mailto:info@eco-vidadesigns.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                info@eco-vidadesigns.com
              </a>
            </p>
            <p className="mt-4 rounded-md border border-border bg-background/80 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Preview note:</span>{" "}
              This form is for design review only. Submissions are not emailed yet;
              delivery will be connected in a later phase.
            </p>
          </div>

          <div className="mt-12 lg:mt-0">
            {submitted ? (
              <div
                className="rounded-lg border border-border bg-background p-8 shadow-sm"
                role="status"
              >
                <p className="font-medium text-foreground">
                  Thank you for your interest.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  In this preview build, your message was not transmitted. When
                  email is configured, this form will deliver to our studio inbox.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-border bg-background p-6 shadow-sm md:p-8"
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone (optional)</Label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+506 …"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-type">Project type</Label>
                    <select
                      id="contact-type"
                      name="projectType"
                      required
                      className={cn(
                        "border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
                      )}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="residential">Residential</option>
                      <option value="resort">Resort / hospitality</option>
                      <option value="commercial">Commercial</option>
                      <option value="masterplan">Master planning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-location">
                      Site or region (optional)
                    </Label>
                    <Input
                      id="contact-location"
                      name="location"
                      placeholder="e.g. Guanacaste, Costa Rica"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Project summary</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Scope, timeline, and any priorities you wish to discuss."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-8 w-full sm:w-auto" size="lg">
                  Send inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
