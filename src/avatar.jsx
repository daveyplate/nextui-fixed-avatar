import React, { forwardRef, useRef, useState } from "react"
import { Avatar as NextUIAvatar } from "@nextui-org/react"

/**
 * Fixed NextUI Avatar
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<import("@nextui-org/avatar").AvatarProps> & React.RefAttributes<HTMLElement>>}
 */
export const Avatar = forwardRef(({ src, ...props }, ref) => {
    const isHydrated = useIsHydrated()
    const image = useRef(isHydrated ? new Image() : null)
    const [showFallback, setShowFallback] = useState(false)

    if (image.current) {
        image.current.src = src
    }

    const ignoreFallback = image.current?.complete && image.current?.naturalWidth > 0

    return (
        <NextUIAvatar
            ref={ref}
            src={src}
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

function subscribe() {
    return () => { }
}

function useIsHydrated() {
    return React.useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )
}