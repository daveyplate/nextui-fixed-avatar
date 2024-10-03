import React, { forwardRef, useRef, useState } from "react"
import { Avatar as NextUIAvatar } from "@nextui-org/avatar"
import { cn } from "@nextui-org/theme"

/**
 * Fixed NextUI Avatar
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<import("@nextui-org/avatar").AvatarProps> & React.RefAttributes<HTMLElement>>}
 */
export const Avatar = forwardRef(({ name, src, size = "md", className, ...props }, ref) => {
    const image = useRef(new Image())
    const [showFallback, setShowFallback] = useState(false)

    if (image.current) {
        image.current.src = src
    }

    let textSize
    switch (size) {
        case 'sm':
            textSize = 'text-tiny'
            break
        case 'lg':
            textSize = 'text-xl'
            break
        default:
            textSize = 'text-base'
    }

    const ignoreFallback = image.current.complete && image.current.naturalWidth > 0

    return (
        <NextUIAvatar
            ref={ref}
            size={size}
            className={cn(textSize, className)}
            src={src}
            name={name?.substring(0, 2)}
            ignoreFallback={ignoreFallback}
            showFallback={showFallback}
            imgProps={{
                onError: () => setShowFallback(true),
                onLoad: () => setShowFallback(false),
            }}
            {...props}
        />
    )
})