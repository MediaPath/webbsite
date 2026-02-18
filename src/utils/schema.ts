import type {
  Article,
  BlogPosting,
  FAQPage,
  ImageObject,
  Organization,
  Person,
  Question,
  SearchAction,
  Service,
  Thing,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts'

const SITE_URL = 'https://mediapatheu.wordpress.com/'
const SITE_NAME = 'MediaPath EU'
const LOGO_URL = `${SITE_URL}images/mediapath-logo.webp`

export const ensureTrailingSlash = (urlString: string | URL): string => {
  const str = urlString.toString()
  if (/\.[a-zA-Z0-9]+$/.test(str)) return str
  return str.endsWith('/') ? str : `${str}/`
}

export const defaultOrganization: Organization = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: '220',
    height: '36',
  } as ImageObject,
}

export const defaultPublisher: Organization = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    contentUrl: LOGO_URL,
  } as ImageObject,
}

export function createWebSiteSchema(options?: {
  url?: string
  description?: string
  searchUrlTemplate?: string
}): WithContext<WebSite> {
  const url = options?.url || SITE_URL
  const description = options?.description || 'iGaming user acquisition and digital marketing services in Europe.'
  const searchUrlTemplate = options?.searchUrlTemplate || `${SITE_URL}?s={search_term_string}`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: ensureTrailingSlash(url),
    description,
    publisher: defaultOrganization,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrlTemplate,
      },
      'query-input': 'required name=search_term_string',
    } as SearchAction,
  }
}

export function createWebPageSchema(options: {
  name: string
  url: string
  description: string
  image?: string
}): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    url: ensureTrailingSlash(options.url),
    description: options.description,
    publisher: defaultOrganization,
    ...(options.image && { image: options.image }),
  }
}

export function createBlogPostingSchema(options: {
  headline: string
  description: string
  image: string
  url: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
  keywords?: string
  articleSection?: string
  wordCount?: number
}): WithContext<BlogPosting> {
  const author: Person = {
    '@type': 'Person',
    name: options.author?.name || 'MediaPath EU',
    ...(options.author?.url && { url: options.author.url }),
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.headline,
    description: options.description,
    image: options.image,
    author,
    publisher: defaultPublisher,
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': ensureTrailingSlash(options.url),
    } as WebPage,
    ...(options.articleSection && { articleSection: options.articleSection }),
    ...(options.keywords && { keywords: options.keywords }),
    ...(options.wordCount && { wordCount: options.wordCount }),
  }
}

export function createArticleSchema(options: {
  headline: string
  description: string
  image?: string
  url: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
}): WithContext<Article> {
  const author: Person = {
    '@type': 'Person',
    name: options.author?.name || 'MediaPath EU',
    ...(options.author?.url && { url: options.author.url }),
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    author,
    publisher: defaultPublisher,
    ...(options.image && { image: options.image }),
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': ensureTrailingSlash(options.url),
    } as WebPage,
  }
}

export function createServiceSchema(options: {
  name: string
  description: string
  url: string
  provider?: Organization
  areaServed?: string
  serviceType?: string
}): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: ensureTrailingSlash(options.url),
    provider: options.provider || defaultOrganization,
    ...(options.areaServed && { areaServed: options.areaServed }),
    ...(options.serviceType && { serviceType: options.serviceType }),
  }
}

export function createFAQPageSchema(
  questions: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  const mainEntity: Question[] = questions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}

export function createOrganizationSchema(options?: {
  name?: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
}): WithContext<Organization> {
  const logoUrl = options?.logo || LOGO_URL
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options?.name || SITE_NAME,
    url: options?.url || SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      contentUrl: logoUrl,
    } as ImageObject,
    ...(options?.description && { description: options.description }),
    ...(options?.sameAs && { sameAs: options.sameAs }),
  }
}

export type JsonLdSchema =
  | WithContext<WebSite>
  | WithContext<WebPage>
  | WithContext<BlogPosting>
  | WithContext<Article>
  | WithContext<Service>
  | WithContext<FAQPage>
  | WithContext<Organization>
  | WithContext<Thing>

export type {
  Article,
  BlogPosting,
  FAQPage,
  ImageObject,
  Organization,
  Person,
  Service,
  WebPage,
  WebSite,
  WithContext,
}
