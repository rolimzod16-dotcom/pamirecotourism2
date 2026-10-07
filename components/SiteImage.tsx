import Image, { type ImageProps } from 'next/image';

function localPhoto(src: ImageProps['src']) {
  return typeof src === 'string' && (src.startsWith('/photos/') || src.startsWith('/images/'));
}

export function SiteImage({ src, alt, className, fill, ...rest }: ImageProps) {
  if (!localPhoto(src)) {
    const classes = fill ? `absolute inset-0 h-full w-full ${className ?? ''}` : className;
    return <img src={typeof src === 'string' ? src : ''} alt={alt} className={classes} />;
  }
  return <Image src={src} alt={alt} className={className} fill={fill} {...rest} />;
}
