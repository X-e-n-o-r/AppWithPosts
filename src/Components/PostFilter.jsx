import React from 'react'
import MySelect from './MySelect'

export default function PostFilter({filter, setFilter}) {
  return (
    <>
      <input 
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder='Search by' />
      <MySelect 
        defaultValue='Sort by'
        options={[
          {value:'title', name:'By title'},
          {value:'body', name:'By description'}
        ]}
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})} />
    </>
  )
}
