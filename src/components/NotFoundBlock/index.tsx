import styles from './NotFoundBlock.module.scss'

export function NotfoundBlock () {
  return (
    <div className={styles.root}>
      <h1>
        <span>4😕4</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>К счастью данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  )
}