import { getAllNotification } from "../actions/notifications";
async function Notifications() {
  const notifications = await getAllNotification();
  console.log(notifications);

  return (
    <div className="p-8">
      {notifications.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold">Nothing to see here — yet</h1>
          <p>
            From likes to reposts and a whole lot more, this is where all the
            action happens.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex gap-4">
              <div>heart</div>
              <div>
                <div className="rounded-full bg-orange-200 h-12 w-12">
                  avatar
                </div>
                <p>
                  <span className="font-bold">
                    {notification.actor.username}
                  </span>{" "}
                  {notification.type} your post
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
