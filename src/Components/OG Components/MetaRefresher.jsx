"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * This component helps force meta tag updates when the route changes
 */
const MetaRefresher = () => {
  const location = useLocation()

  useEffect(() => {
    // Force meta refresh on route change
    const metaTags = document.getElementsByTagName("meta")

    // This small manipulation forces the browser to re-evaluate meta tags
    for (let i = 0; i < metaTags.length; i++) {
      const tag = metaTags[i]
      if (tag.getAttribute("property")?.startsWith("og:") || tag.getAttribute("name")?.startsWith("twitter:")) {
        // Store the current value
        const attrName = tag.getAttribute("property") ? "property" : "name"
        const attrValue = tag.getAttribute(attrName)
        const content = tag.getAttribute("content")

        // Remove and re-add the attribute to force a refresh
        tag.removeAttribute(attrName)
        setTimeout(() => {
          tag.setAttribute(attrName, attrValue)
          tag.setAttribute("content", content)
        }, 10)
      }
    }

    // Also refresh the document title
    const currentTitle = document.title
    document.title = ""
    setTimeout(() => {
      document.title = currentTitle
    }, 10)
  }, [location.pathname])

  return null // This component doesn't render anything
}

export default MetaRefresher
