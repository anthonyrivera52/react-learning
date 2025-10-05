import { useCatImage } from '../hooks/useCatImage'

export function Others ({ fact }) {
  const { imageUrl } = useCatImage({ fact })
  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
