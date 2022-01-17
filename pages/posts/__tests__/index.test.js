
import {render} from '@testing-library/vue'
import index from '../index.vue'
import '@testing-library/jest-dom'

describe('posts/index.js', () => {
  it('text elements value empty by testid', () => {
    const {getByTestId} = render(index)
    const textUserId = getByTestId('textUserId')
    expect(textUserId).toHaveValue('')
  }),
  it('text elements value empty by label text', () => {
    const {getByLabelText} = render(index)
    const textUserName = getByLabelText('ユーザー名')
    const textTitle = getByLabelText('タイトル')
    const textBody = getByLabelText('本文')
    expect(textUserName).toHaveValue('')
    expect(textTitle).toHaveValue('')
    expect(textBody).toHaveValue('')
  })
    // ,
  // it('search user id', async () => {
  //   await setTimeout(() => {
  //     console.log("test")
  //   }, 50000);
  //   const {findByTestId, findAllByTestId} = render(index)
  //   const textUserId = await findByTestId('textUserId')

  //   textUserId.value = await "1"
  //   const cards = await findAllByTestId('postcard')

  //   await expect(cards).toHaveLength(10)
    
  // })
})
