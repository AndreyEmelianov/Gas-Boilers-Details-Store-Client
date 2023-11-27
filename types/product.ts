export interface IProductImagesItemProps {
  src: string
  alt: string
  callback: (arg0: string) => void
}

export interface IProductAccordionProps {
  children: React.ReactNode
  title: string
}
