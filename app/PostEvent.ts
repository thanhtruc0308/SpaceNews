export interface Post{
  id: number,
  date: Date,
  time: Date,
  location: string,
  priority: number,
  title: string,
  image: string,
  content: string,
  showInSlider: boolean,
  topicID: number,
  GroupID : number
}