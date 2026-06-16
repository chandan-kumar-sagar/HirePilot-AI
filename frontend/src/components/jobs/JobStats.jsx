export default function JobStats({
  stats,
}) {
  const cards = [
    {
      title: "Saved",
      value: stats?.saved || 0,
      color: "from-blue-200 to-blue-100",
    },
    {
      title: "Applied",
      value: stats?.applied || 0,
      color: "from-pink-200 to-pink-100",
    },
    {
      title: "Interview",
      value: stats?.interview || 0,
      color: "from-purple-200 to-purple-100",
    },
    {
      title: "Offer",
      value: stats?.offer || 0,
      color: "from-green-200 to-green-100",
    },
    {
      title: "Rejected",
      value: stats?.rejected || 0,
      color: "from-orange-200 to-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6`}
        >
          <h4>{card.title}</h4>

          <h2 className="text-4xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}