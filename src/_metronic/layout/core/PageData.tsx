/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  toolbar?: ReactNode
  setToolbar: (children:ReactNode) => void
  pageLoading?: boolean
  setPageLoading: (_pageLoading: boolean) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: _title => {},
  setPageBreadcrumbs: _breadcrumbs => {},
  setPageDescription: _description => {},
  setToolbar: children => {},
  setPageLoading: _pageLoading => {}
})

const PageDataProvider: React.FC = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [toolbar, setToolbar] = useState<ReactNode>(null)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    toolbar,
    setToolbar,
    pageLoading,
    setPageLoading
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props> = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: React.FC = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

const PageToolbar: React.FC = ({children}) => {
  const {setToolbar} = usePageData()
  useEffect(() => {
    if (children) {
      setToolbar(children)
    }
    return () => {
      setToolbar(null)
    }
  }, [children])
  return <></>
}

const PageLoading = ({loading}:{loading:boolean}) => {
  const {setPageLoading} = usePageData()
  useEffect(() => {
    setPageLoading(loading)
    return () => {
      setPageLoading(false)
    }
  }, [loading])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData, PageToolbar, PageLoading}
