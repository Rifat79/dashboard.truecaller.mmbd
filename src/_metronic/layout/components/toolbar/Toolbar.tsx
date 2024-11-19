/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PageLink, useLayout } from '../../core'
type Props = {
  children?: any
  breadcrumbs?: Array<PageLink>
  title?: any
}

const Toolbar: FC<Props> = ({ children, breadcrumbs, title }) => {
  const { classes } = useLayout();

  return (
    <>
      <div className='toolbar' id='kt_toolbar'>
        {/* begin::Container */}
        <div
          id='kt_toolbar_container'
          className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
        >
          <div
            className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
          >
            {title?.length > 0 && (
              <div className="d-flex align-items-center" id="kt_header_nav"><span className="d-flex align-items-center  my-1 fs-5">{title}</span></div>
            )}
            {breadcrumbs &&
              breadcrumbs.length > 0 && (
                <>
                  <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
                    {Array.from(breadcrumbs).map((item, index) => (
                      <li
                        className={clsx('breadcrumb-item', {
                          'text-dark': !item.isSeparator && item.isActive,
                          'text-muted': !item.isSeparator && !item.isActive,
                        })}
                        key={`${item.path}${index}`}
                      >
                        {!item.isSeparator ? (
                          <Link className='text-muted text-hover-primary' to={item.path}>
                            {item.title}
                          </Link>
                        ) : (
                          <span className='bullet bg-gray-200 w-5px h-2px'></span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>

          {/* begin::Actions */}
          <div className='d-flex align-items-center py-1'>
            {children}
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Container */}
      </div>
    </>
  )
}

export { Toolbar }
