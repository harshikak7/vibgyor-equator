
import {sanityClient} from './sanity'
import {allProductsQuery} from './queries'

export async function getAllProducts() {
  return sanityClient.fetch(allProductsQuery)
}
