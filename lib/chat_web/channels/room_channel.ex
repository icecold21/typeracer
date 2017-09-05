defmodule ChatWeb.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", _message, socket) do
    IO.inspect("OKAY I'm here")
    {:ok, socket}
  end

  def handle_in("msg", %{"body" => body}, socket) do
    # IO.inspect payload
    broadcast socket, "msg", %{body: body, username: socket.assigns.username}
    {:noreply, socket}
  end
end