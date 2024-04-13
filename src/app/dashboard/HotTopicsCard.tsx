import CustomWordCloud from '@/components/CustomWordCloud'
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
            <CustomWordCloud />
        </CardContent>
    </Card>
  )
}

export default HotTopicsCard