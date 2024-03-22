/* eslint-disable react/jsx-no-target-blank */
import React, {Fragment} from 'react';
import {AsideMenuItem} from './AsideMenuItem';
import {useAuth} from '../../../../_custom/hooks/UseAuth';
import {ViewEnum} from '../../../../_custom/types/ModelMapping';
import {ModelEnum} from '../../../../app/modules/types';
import {getRoutePrefix} from '../../../../_custom/utils'
import {Trans} from '../../../../_custom/components/Trans'

const GROUPS = [
  {
    title: 'Gestion des utilisateurs',
    operations: [
      ModelEnum.Resource,
      ModelEnum.Operation,
      ModelEnum.Role,
      ModelEnum.User,
    ]
  }
];

export function AsideMenuMain() {
  const auth = useAuth();
  const operations = auth.operations
    .filter(({operationType, isMenuItem}) => isMenuItem && operationType === ViewEnum.Listing)
    .sort((a, b) => a.resource.sortIndex - b.resource.sortIndex);

  return (
    <>
      <AsideMenuItem
        path='/dashboard'
        title={<Trans id='DASHBOARD' />}
        icon='/graphs/gra010.svg'
      />
      <AsideMenuItem
        path='/budget-monitoring'
        title={<Trans id='BUDGET_MONITORING' />}
        icon='/graphs/gra004.svg'
      />
      {operations.filter(({operationType, isMenuItem}) => isMenuItem && operationType === ViewEnum.Listing)
        .sort((a, b) => a.resource.sortIndex - b.resource.sortIndex)
        .map(operation => <AsideMenuItem key={operation.id} {...operation} path={getRoutePrefix(operation.resource.name)} />)}
      {/*{GROUPS.map(group => {*/}
      {/*  const _ope = operations.filter(({resource}) => group.operations.includes(resource.name));*/}
      {/*  if (_ope.length === 0) return <Fragment key={group.title} />*/}

      {/*  return (*/}
      {/*    <>*/}
      {/*      <div className='menu-item'>*/}
      {/*        <div className='menu-content pt-8 pb-2'>*/}
      {/*          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>*/}
      {/*            {group.title}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      {_ope.map(operation => <AsideMenuItem key={operation.id} {...operation} />)}*/}
      {/*    </>*/}
      {/*  );*/}
      {/*})}*/}

      {/*....................*/}
      {/*{*/}
      {/*  menuRoutes.map(route => {*/}
      {/*    const { id } = route;*/}
      {/*    // const childrenRoutes = routes*/}
      {/*    // .filter(({ parent }) => parent?.id === id)*/}
      {/*    // .filter(isStaticRoute);*/}

      {/*    if (!route.parent) {*/}
      {/*      return (*/}
      {/*        <AsideMenuItem key={id} {...route} />*/}
      {/*      )*/}
      {/*      // return (*/}
      {/*      //   <div key={id}>*/}
      {/*      //     <AsideMenuItem {...route} group/>*/}
      {/*      //*/}
      {/*      //     <AsideMenuItem {...route}/>*/}
      {/*      //     {childrenRoutes.map(child => (*/}
      {/*      //       <AsideMenuItem key={child.id} {...child}/>*/}
      {/*      //     ))}*/}
      {/*      //   </div>*/}
      {/*      // );*/}
      {/*      // return (*/}
      {/*      //*/}
      {/*      //   <AsideMenuItemWithSub key={id} {...route} >*/}
      {/*      //     <AsideMenuItem key={id} {...route} icon={undefined} title={route.contextualTitle || route.title}/>*/}
      {/*      //     {childrenRoutes.map(child => (*/}
      {/*      //       <AsideMenuItem key={child.id} {...child} icon={undefined} title={child.contextualTitle || child.title}/>*/}
      {/*      //     ))}*/}
      {/*      //   </AsideMenuItemWithSub>*/}
      {/*      // );*/}
      {/*    }*/}

      {/*    return <AsideMenuItem key={id} {...route} />;*/}
      {/*  })*/}
      {/*}*/}


      {/*<AsideMenuItem*/}
      {/*  to='/builder'*/}
      {/*  icon='/media/icons/duotune/general/gen019.svg'*/}
      {/*  title='Layout Builder'*/}
      {/*  fontIcon='bi-layers'*/}
      {/*/>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content pt-8 pb-2'>*/}
      {/*    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/pages'*/}
      {/*  title='Pages'*/}
      {/*  fontIcon='bi-archive'*/}
      {/*  icon='/media/icons/duotune/general/gen022.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/crafted/pages/profile/connections'*/}
      {/*      title='Connections'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*  </AsideMenuItemWithSub>*/}

      {/*  <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/crafted/pages/wizards/horizontal'*/}
      {/*      title='Horizontal'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*    <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />*/}
      {/*  </AsideMenuItemWithSub>*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/accounts'*/}
      {/*  title='Accounts'*/}
      {/*  icon='/media/icons/duotune/communication/com006.svg'*/}
      {/*  fontIcon='bi-person'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/error'*/}
      {/*  title='Errors'*/}
      {/*  fontIcon='bi-sticky'*/}
      {/*  icon='/media/icons/duotune/general/gen040.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/widgets'*/}
      {/*  title='Widgets'*/}
      {/*  icon='/media/icons/duotune/general/gen025.svg'*/}
      {/*  fontIcon='bi-layers'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content pt-8 pb-2'>*/}
      {/*    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/apps/chat'*/}
      {/*  title='Chat'*/}
      {/*  fontIcon='bi-chat-left'*/}
      {/*  icon='/media/icons/duotune/communication/com012.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content'>*/}
      {/*    <div className='separator mx-1 my-4'></div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className='menu-item'>*/}
      {/*  <a*/}
      {/*    target='_blank'*/}
      {/*    className='menu-link'*/}
      {/*    href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}*/}
      {/*  >*/}
      {/*    <span className='menu-icon'>*/}
      {/*      <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />*/}
      {/*    </span>*/}
      {/*    <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </>
  )
}