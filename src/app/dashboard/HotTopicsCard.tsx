import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className='col-span-4'>
        <CardHeader>
            <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
            <CardDescription>View the most popular topics</CardDescription>
        </CardHeader>
        <CardContent className='pl-2'>
            <p>word cloud</p>
        </CardContent>
    </Card>
  )
}

export default HotTopicsCard