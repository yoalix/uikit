import { ComponentInternals, Container, ContainerProperties, Text } from '@react-three/uikit'
import { ChevronLeft, ChevronRight, MoreHorizontal } from '@react-three/uikit-lucide'
import React, { ReactNode, RefAttributes } from 'react'
import { borderRadius, colors } from './theme.js'

export type PaginationProperties = ContainerProperties

export function Pagination(props: PaginationProperties) {
  return <Container marginX="auto" flexDirection="row" width="100%" justifyContent="center" {...props} />
}

export type PaginationContentProperties = ContainerProperties

export function PaginationContent(props: PaginationContentProperties) {
  return <Container flexDirection="row" alignItems="center" gap={4} {...props} />
}

export type PaginationItemProperties = ContainerProperties

export const PaginationItem: (
  props: ContainerProperties & RefAttributes<ComponentInternals<ContainerProperties>>,
) => ReactNode = Container

const paginationVariants: {
  [Key in string]: {
    containerProps?: Omit<ContainerProperties, 'hover'>
    containerHoverProps?: ContainerProperties['hover']
  }
} = {
  outline: {
    containerProps: {
      borderWidth: 1,
      borderColor: colors.input,
      backgroundColor: colors.background,
    },
    containerHoverProps: {
      backgroundColor: colors.accent,
    },
  }, //TODO: hover:text-accent-foreground",
  ghost: {
    containerHoverProps: {
      backgroundColor: colors.accent,
    },
  }, // TODO: hover:text-accent-foreground",
}

const paginationSizes = {
  default: { height: 40, paddingX: 16, paddingY: 8 },
  sm: { height: 36, paddingX: 12 },
  lg: { height: 42, paddingX: 32 },
  icon: { height: 40, width: 40 },
} satisfies { [Key in string]: ContainerProperties }

export type PaginationLinkProperties = ContainerProperties & {
  size?: keyof typeof paginationSizes
  isActive?: boolean
}

export function PaginationLink({ isActive = false, size = 'icon', hover, ...props }: PaginationLinkProperties) {
  const { containerProps, containerHoverProps } = paginationVariants[isActive ? 'outline' : 'ghost']
  const sizeProps = paginationSizes[size]
  return (
    <Container
      cursor="pointer"
      borderRadius={borderRadius.md}
      alignItems="center"
      justifyContent="center"
      hover={{ ...containerHoverProps, ...hover }}
      {...containerProps}
      {...sizeProps}
      {...props}
    />
  )
}

export type PaginationPreviousProperties = Omit<PaginationLinkProperties, 'children'>

export function PaginationPrevious(props: PaginationPreviousProperties) {
  return (
    <PaginationLink flexDirection="row" size="default" gap={4} paddingLeft={10} {...props}>
      <ChevronLeft width={16} height={16} />
      <Text>Previous</Text>
    </PaginationLink>
  )
}

export type PaginationNextProperties = Omit<PaginationLinkProperties, 'children'>

export function PaginationNext(props: PaginationNextProperties) {
  return (
    <PaginationLink flexDirection="row" size="default" gap={4} paddingRight={10} {...props}>
      <Text>Next</Text>
      <ChevronRight width={16} height={16} />
    </PaginationLink>
  )
}

export type PaginationEllipsisProperties = Omit<PaginationLinkProperties, 'children'>

export function PaginationEllipsis(props: PaginationEllipsisProperties) {
  return (
    <Container flexDirection="row" height={36} width={36} alignItems="center" justifyContent="center" {...props}>
      <MoreHorizontal width={16} height={16} />
    </Container>
  )
}
//<span className="sr-only">More pages</span>
