"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CookieBannerProps {
    onAccept: () => void
    onDecline: () => void
    className?: string
}

export function CookieBanner({ onAccept, onDecline, className }: CookieBannerProps) {
    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t supports-[backdrop-filter]:bg-background/60 shadow-t-lg transition-all duration-300 ease-in-out animate-in slide-in-from-bottom",
                className
            )}
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground text-center md:text-left">
                    <p>
                        We use cookies to improve your experience and analyze our traffic.
                        By clicking "Accept", you consent to our use of cookies.
                        <Link href="/privacy" className="underline hover:text-foreground ml-1 font-medium underline-offset-4">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3 min-w-fit">
                    <Button variant="outline" onClick={onDecline} className="min-w-[90px]">
                        Decline
                    </Button>
                    <Button onClick={onAccept} className="min-w-[90px]">
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    )
}
