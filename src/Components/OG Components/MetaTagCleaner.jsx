"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Component that cleans up duplicate meta tags when the route changes
 */
const MetaTagCleaner = () => {
  const location = useLocation()

  useEffect(() => {
    // Function to clean up duplicate meta tags
    const cleanupMetaTags = () => {
      // Get all meta tags
      const metaTags = document.querySelectorAll("meta")

      // Create a map to track seen tags by their name/property
      const seenTags = new Map()

      // Identify and remove duplicates
      metaTags.forEach((tag) => {
        const name = tag.getAttribute("name")
        const property = tag.getAttribute("property")
        const key = name || property

        if (!key) return // Skip tags without name or property

        if (!seenTags.has(key)) {
          seenTags.set(key, tag)
        } else {
          // Keep the most recently added tag (likely from react-helmet)
          // This assumes the DOM order reflects the order of addition
          const previousTag = seenTags.get(key)
          previousTag.remove()
          seenTags.set(key, tag)
        }
      })
    }

    // Clean up meta tags when route changes
    cleanupMetaTags()

    // Set up a MutationObserver to watch for changes to the head
    const observer = new MutationObserver((mutations) => {
      let shouldCleanup = false

      // Check if any meta tags were added
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "META") {
            shouldCleanup = true
          }
        })
      })

      if (shouldCleanup) {
        // Delay cleanup slightly to allow React Helmet to finish its updates
        setTimeout(cleanupMetaTags, 50)
      }
    })

    // Start observing the document head
    observer.observe(document.head, {
      childList: true,
      subtree: true,
    })

    // Clean up observer on unmount
    return () => {
      observer.disconnect()
    }
  }, [location.pathname]) // Re-run when the route changes

  // This component doesn't render anything
  return null
}

export default MetaTagCleaner
