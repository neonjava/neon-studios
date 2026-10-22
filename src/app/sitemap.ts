import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
export default function sitemap(): MetadataRoute.Sitemap { return ['/','/services','/work','/lab','/about','/contact'].map(route => ({ url: site.url + route, changeFrequency: route === '/' ? 'weekly' : 'monthly', priority: route === '/' ? 1 : .7 })); }
