import React from 'react'
import * as FaIcons from 'react-icons/fa' 

export const SidebarData = [
    {
        menuId: 1,
        parentId: 0,
        title: 'Home',
        path: '/',
        icon: <FaIcons.FaHome />,
        children: []
    },
    {
        menuId: 2,
        parentId: 0,
        title: 'Team',
        path: '/team',
        icon: <FaIcons.FaUsers />,
        children: []
    },
    {
        menuId: 3,
        parentId: 0,
        title: 'Tasks',
        path: '/tasks',
        icon: <FaIcons.FaTasks />,
        children: [
          {
            menuId: 4,
            parentId: 3,
            title: 'Sub Task 1',
            path: '/subtask1',
            icon: <FaIcons.FaTasks />,
            children: []
          },
          {
            menuId: 5,
            parentId: 3,
            title: 'Sub Task 2',
            path: '/subtask2',
            icon: <FaIcons.FaTasks />,
            children: []
          }
        ]
    },
    {
        menuId: 6,
        parentId: 0,
        title: 'Chats',
        path: '/chats',
        icon: <FaIcons.FaRocketchat />,
        children: []
    },
    {
        menuId: 7,
        parentId: 0,
        title: 'Analytics',
        path: '/analytics',
        icon: <FaIcons.FaRegChartBar />,
        children: []
    }
]
