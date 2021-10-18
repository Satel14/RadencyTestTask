module.exports.get = notes => {
  const statistic = {
    allNotes: 0,
    activeNotes: 0,
    archivedNotes: 0,

    categories: [
      {
        category: 'Idea',
        active: 0,
        archived: 0
      },
      {
        category: 'Quote',
        active: 0,
        archived: 0
      },
      {
        category: 'Random Thought',
        active: 0,
        archived: 0
      },
      {
        category: 'Task',
        active: 0,
        archived: 0
      }
    ]
  }


  notes.forEach(el => {
    let addToActive = 0
    let addToArchived = 0
    el.archived ? addToArchived++ : addToActive++

    statistic.allNotes++
    statistic.activeNotes += addToActive
    statistic.archivedNotes += addToArchived

    const category = statistic.categories.find(cat => cat.category === el.category)
    category.active += addToActive
    category.archived += addToArchived
  })

  return statistic
}